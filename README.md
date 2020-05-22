## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view serving project in the browser.

### `yarn storybook`

Runs component in Storybook.<br>
Open [http://localhost:6006](http://localhost:6006) to view Storybook in the browser.

If you wanted to add a package while docker-compose was running your app

### `adding environment variable`

[How to setup environment variable](https://github.com/20Scoops-CNX/documents-developer/blob/master/frontend/frontend-guidelines.md#%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89-environment-variable)

## Environment Variable

`DANGER_GITHUB_API_TOKEN`

github account api token for danger bot to use for commenting code (use 20scoops bot account, please ask developer)

`REACT_APP_SERVER`

specify it's localhost, development, staging, production so that we can run code base on this environment (for example, remove redux-logger when `REACT_APP_SERVER` is staging or production)

`REACT_APP_API_URL`

specify api service path (if needed) for using in `constants/api-endpoints.js`.

### Deploy SCP

```yml
build-and-deploy:
  name: Build and Deploy Production
  runs-on: ubuntu-latest
  needs: install-and-check

  if: github.event_name == 'push' && (endsWith(github.ref, 'master'))
  steps:
    - uses: actions/checkout@master

    - name: Install
      run: yarn

    - name: Bundle Application
      run: |
        ./generate-env --env=${GITHUB_REF#refs/heads/}
        yarn build

    - name: Deploy develop server
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }} #Default is centos
        key: ${{ secrets.SSH_KEY }}
        port: ${{ secrets.PORT }} #Default is 22
        source: 'build'
        target: '/var/www/project-name/html'
```

### Deploy S3

```yml
build-and-deploy:
  name: Build and Deploy Production
  runs-on: ubuntu-latest
  needs: install-and-check

  if: github.event_name == 'push' && (endsWith(github.ref, 'master'))
  steps:
    - uses: actions/checkout@master

    - name: Install
      run: yarn

    - name: Bundle Application
      run: |
        ./generate-env --env=${GITHUB_REF#refs/heads/}
        yarn build

    - name: Deploy to S3
      uses: jakejarvis/s3-sync-action@master
      with:
        args: --delete --cache-control 'public, max-age=0, must-revalidate'
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'eu-central-1'
        SOURCE_DIR: 'build'
```

If you want to deploy different bucket based on multiple environment, you can use `set-output` for setting bucket name.

```yml
- name: Add Branches Name
  run: |
    BRANCH_NAME=${GITHUB_REF#refs/heads/}
    if [ "$BRANCH_NAME" == "develop" ]
    then
    echo "##[set-output name=branch_name;]develop-bucket.com"
    elif [ "$BRANCH_NAME" == "staging" ]
    then
    echo "##[set-output name=branch_name;]staging-bucket.com"
    elif [ "$BRANCH_NAME" == "master" ]
    then
    echo "##[set-output name=branch_name;]prod-bucket.com"
    fi
  id: extract_branch_name
- name: Deploy to S3
  uses: jakejarvis/s3-sync-action@master
  env:
    AWS_S3_BUCKET: ${{ steps.extract_branch_name.outputs.branch_name }}
```

#### Deploy s3 with cloudflare

You need to purge cache (clear cache) in cloudflare after deploying to s3

```yml
# Deploy to s3
- name: Purge Cloudflare
  run: ./purge
  env:
    CF_ZONE_ID: ${{secrets.CF_ZONE_ID}}
    CF_API_TOKEN: ${{secrets.CF_API_TOKEN}}
```

#### Deploy to ECR

Place Job command behind the main.yml

```yml
build-and-deploy:
  name: Build and Deploy
  runs-on: self-hosted
  needs: install-and-check
  if: github.event_name == 'push' && (endsWith(github.ref, 'develop') || endsWith(github.ref, 'staging'))
  steps:
    - uses: actions/checkout@master
      with:
        fetch-depth: 1

    - name: Add Image Name
      shell: bash
      run: |
        REPOSITORY_NAME=${GITHUB_REPOSITORY#*/}
        BRANCH_NAME=${GITHUB_REF#refs/heads/}
        if [ "$BRANCH_NAME" == "develop" ]
        then
          echo "##[set-output name=image_name;]$(echo $REPOSITORY_NAME):dev"
        elif [ "$BRANCH_NAME" == "staging" ]
        then
          echo "##[set-output name=image_name;]$(echo $REPOSITORY_NAME):staging"
        elif [[ ${GITHUB_REF} =~ ^refs/tags ]]
        then
          echo "##[set-output name=image_name;]:$(echo $REPOSITORY_NAME:${GITHUB_REF#refs/tags/})"
        fi
      id: extract_image_name

    - name: Docker Build
      run: |
        ./prod/generate-env.sh
        docker build -t ${{ steps.extract_image_name.outputs.image_name }} --file ./prod/Dockerfile .
      env:
        CI: true
        REACT_APP_SERVER: production
        # add ENV
        # REACT_APP_API: ${{secrets.REACT_APP_API}}

    - name: Login to ECR
      id: ecr
      uses: jwalton/gh-ecr-login@v1
      with:
        access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        region: ${{ secrets.AWS_REGION }}

    - name: Push to ECR
      run: |
        docker tag ${{ steps.extract_image_name.outputs.image_name }} ${{ steps.ecr.outputs.account }}.dkr.ecr.${REGION}.amazonaws.com/${{ steps.extract_image_name.outputs.image_name }}
        docker push ${{ steps.ecr.outputs.account }}.dkr.ecr.${REGION}.amazonaws.com/${{ steps.extract_image_name.outputs.image_name }}
      env:
        REGION: ${{ secrets.AWS_REGION }}

    - name: Slack Notification Build and Deploy
      if: always()
      uses: 8398a7/action-slack@v2
      with:
        status: ${{ job.status }}
        author_name: ${{ github.repository }}
        fields: repo,message,action,author
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```
