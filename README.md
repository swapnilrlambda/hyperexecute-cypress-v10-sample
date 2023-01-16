<img height="100" alt="hyperexecute_logo" src="https://user-images.githubusercontent.com/1688653/159473714-384e60ba-d830-435e-a33f-730df3c3ebc6.png">

HyperExecute is a smart test orchestration platform to run end-to-end Cypress tests at the fastest speed possible. HyperExecute lets you achieve an accelerated time to market by providing a test infrastructure that offers optimal speed, test orchestration, and detailed execution logs.

The overall experience helps teams test code and fix issues at a much faster pace. HyperExecute is configured using a YAML file. Instead of moving the Hub close to you, HyperExecute brings the test scripts close to the Hub!

* <b>HyperExecute HomePage</b>: https://www.lambdatest.com/hyperexecute
* <b>Lambdatest HomePage</b>: https://www.lambdatest.com
* <b>LambdaTest Support</b>: [support@lambdatest.com](mailto:support@lambdatest.com)

To know more about how HyperExecute does intelligent Test Orchestration, do check out [HyperExecute Getting Started Guide](https://www.lambdatest.com/support/docs/getting-started-with-hyperexecute/)

[<img alt="Try it now" width="200 px" align="center" src="images/Try it Now.svg" />](https://hyperexecute.lambdatest.com/?utm_source=github&utm_medium=repository&utm_content=java&utm_term=cypress_v10)


## Gitpod

Follow the below steps to run Gitpod button:

1. Click '**Open in Gitpod**' button (You will be redirected to Login/Signup page).
2. Login with Lambdatest credentials and it will be redirected to Gitpod editor in new tab and current tab will show hyperexecute dashboard.

[<img alt="Run in Gitpod" width="200 px" align="center" src="images/Gitpod.svg" />](https://hyperexecute.lambdatest.com/hyperexecute/jobs?type=gitpod&framework=Cypress-v10&frameworkType=Cypress)
---

<!---If logged in, it will be redirected to Gitpod editor in new tab where current tab will show hyperexecute dashboard.

If not logged in, it will be redirected to Login/Signup page and simultaneously redirected to Gitpod editor in a new tab where current tab will show hyperexecute dashboard.

If not signed up, you need to sign up and simultaneously redirected to Gitpod in a new tab where current tab will show hyperexecute dashboard.--->

# How to run Cypress automation tests on HyperExecute

* [Pre-requisites](#pre-requisites)
   - [Download HyperExecute CLI](#download-hyperexecute-cli)
   - [Configure Environment Variables](#configure-environment-variables)

* [Auto-Split Execution with cypress_v10](#auto-split-execution-with-cypress_v10)
   - [Core](#core)
   - [Pre Steps](#pre-steps)
   - [Post Steps](#post-steps)
   - [Test Execution](#test-execution)

* [Matrix Execution with cypress_v10](#matrix-execution-with-cypress_v10)
   - [Core](#core-1)
   - [Pre Steps](#pre-steps)
   - [Post Steps](#post-steps-1)
   - [Test Execution](#test-execution-1)

* [Secrets Management](#secrets-management)
* [Navigation in Automation Dashboard](#navigation-in-automation-dashboard)

# Pre-requisites

Before using HyperExecute, you have to download HyperExecute CLI corresponding to the host OS. Along with it, you also need to export the environment variables *LT_USERNAME* and *LT_ACCESS_KEY* that are available in the [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile) page.

## Download HyperExecute CLI

HyperExecute CLI is the CLI for interacting and running the tests on the HyperExecute Grid. The CLI provides a host of other useful features that accelerate test execution. In order to trigger tests using the CLI, you need to download the HyperExecute CLI binary corresponding to the platform (or OS) from where the tests are triggered:

Also, it is recommended to download the binary in the project's parent directory. Shown below is the location from where you can download the HyperExecute CLI binary:

* Mac: https://downloads.lambdatest.com/hyperexecute/darwin/hyperexecute
* Linux: https://downloads.lambdatest.com/hyperexecute/linux/hyperexecute
* Windows: https://downloads.lambdatest.com/hyperexecute/windows/hyperexecute.exe

## Configure Environment Variables

Before the tests are run, please set the environment variables LT_USERNAME & LT_ACCESS_KEY from the terminal. The account details are available on your [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile) page.

For macOS:

```bash
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Linux:

```bash
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Windows:

```bash
set LT_USERNAME=LT_USERNAME
set LT_ACCESS_KEY=LT_ACCESS_KEY
```

## Auto-Split Execution with cypress_v10

Auto-split execution mechanism lets you run tests at predefined concurrency and distribute the tests over the available infrastructure. Concurrency can be achieved at different levels - file, module, test suite, test, scenario, etc.

For more information about auto-split execution, check out the [Auto-Split Getting Started Guide](https://www.lambdatest.com/support/docs/getting-started-with-hyperexecute/#smart-auto-test-splitting)

### Core

Auto-split YAML file (*yaml/.hyperexecute_autosplit.yaml*) in the repo contains the following configuration:

```yaml
globalTimeout: 90
testSuiteTimeout: 90
testSuiteStep: 90
```

Global timeout, testSuite timeout, and testSuite timeout are set to 90 minutes.
 
The *runson* key determines the platform (or operating system) on which the tests are executed. Here we have set the target OS as Windows.

```yaml
runson: win
```

Auto-split is set to true in the YAML file.

```yaml
 autosplit: true
```

*retryOnFailure* is set to true, instructing HyperExecute to retry failed command(s). The retry operation is carried out till the number of retries mentioned in *maxRetries* are exhausted or the command execution results in a *Pass*. In addition, the concurrency (i.e. number of parallel sessions) is set to 4.

```yaml
retryOnFailure: true
maxRetries: 1
concurrency: 1
```

Cypress is set to true in the YML file.

```yaml
cypress: true
```
Cypress Build name and tags are added in the YML file.

```yaml
cypressOps:
 Build: "Hyperexecute Cypress Sample Build"
 Tags: ["Hyperexecute","Cypress", "Windows", "Autosplit"]
 BuildTags: ["Hyperexecute-Cypress"]
```

### Pre Steps

Steps (or commands) that must run before the test execution are listed in the *pre* run step.

```yaml
pre:
  - npm install
```

### Post Steps

Steps (or commands) that need to run after the test execution are listed in the *post* step. In the example, we *cat* the contents of *yaml/.hyperexecute_autosplit.yaml*

```yaml
post:
  - cat yaml/win/.hyperexecute_autosplit.yaml
```

The *testDiscovery* directive contains the command that gives details of the mode of execution, along with detailing the command that is used for test execution. Here, we are fetching the list of class names that would be further passed in the *testRunnerCommand*

```yaml
testDiscovery:
  type: raw
  mode: static
  command: ls cypress/e2e/2-advanced-examples | sed -n 1,'1p'
```

Running the above command on the terminal will give a list of scenarios present in the *feature* files:

* actions.cy.js

The *testRunnerCommand* contains the command that is used for triggering the test. The output fetched from the *testDiscoverer* command acts as an input to the *testRunner* command.

```yaml
testRunnerCommand: npx cypress run  --spec ./cypress/e2e/2-advanced-examples/$test --browser=chrome-95.0 --headed --config video=false
```

### Test Execution

The CLI option *--config* is used for providing the custom HyperExecute YAML file (i.e. *yaml/win/.hyperexecute_autosplit.yaml* for Windows, *yaml/linux/.hyperexecute_autosplit.yaml* for Linux and  *yaml/mac/.hyperexecute_autosplit.yaml* for Mac).

#### Execute cypress_v10 tests using Autosplit mechanism on Windows platform

Run the following command on the terminal to trigger the tests in Java files with HyperExecute platform set to Windows. The *--download-artifacts* option is used to inform HyperExecute to download the artifacts for the job. The *--force-clean-artifacts* option force cleans any existing artifacts for the project.

```bash
./hyperexecute --config yaml/win/.hyperexecute_autosplit.yaml --force-clean-artifacts --download-artifacts
```

#### Execute cypress_v10 tests using Autosplit mechanism on Linux platform

Run the following command on the terminal to trigger the tests in Java files with HyperExecute platform set to Linux. The *--download-artifacts* option is used to inform HyperExecute to download the artifacts for the job. The *--force-clean-artifacts* option force cleans any existing artifacts for the project.

```bash
./hyperexecute --config yaml/linux/.hyperexecute_autosplit.yaml --force-clean-artifacts --download-artifacts
```

#### Execute cypress_v10 tests using Autosplit mechanism on Mac platform

Run the following command on the terminal to trigger the tests in Java files with HyperExecute platform set to Linux. The *--download-artifacts* option is used to inform HyperExecute to download the artifacts for the job. The *--force-clean-artifacts* option force cleans any existing artifacts for the project.

```bash
./hyperexecute --config yaml/mac/.hyperexecute_autosplit.yaml --force-clean-artifacts --download-artifacts
```

Visit [HyperExecute Automation Dashboard](https://automation.lambdatest.com/hyperexecute) to check the status of execution

<img width="1247" alt="Screenshot 2022-09-12 at 6 37 26 PM" src="https://user-images.githubusercontent.com/89007259/189662415-491f4660-ba5d-4779-bb65-fd3128585933.png">


# Matrix Execution with cypress_v10

Matrix-based test execution is used for running the same tests across different test (or input) combinations. The Matrix directive in HyperExecute YAML file is a *key:value* pair where value is an array of strings.

Also, the *key:value* pairs are opaque strings for HyperExecute. For more information about matrix multiplexing, check out the [Matrix Getting Started Guide](https://www.lambdatest.com/support/docs/getting-started-with-hyperexecute/#matrix-based-build-multiplexing)

### Core

In the current example, matrix YAML file (*yaml/.hyperexecute_matrix.yaml*) in the repo contains the following configuration:

```yaml
globalTimeout: 100
testSuiteTimeout: 90
testSuiteStep: 90
```

Global timeout, testSuite timeout, and testSuite timeout are set to 90 minutes.
 
The target platform is set to Win. Please set the *[runson]* key to *[mac]* if the tests have to be executed on the macOS platform.

```yaml
runson: win
```

The *matrix* constitutes of the following entries - *files*. The entries represent the test file names in the test code.

```yaml
matrix:
  os: [win]
  browser: ["chrome-95.0","chrome-96.0","chrome-97.0","chrome-98.0","chrome-99.0","chrome-100.0","chrome-101.0","chrome-102.0","chrome-103.0","chrome-104.0","chrome-105.0"]
  files: ["actions.cy.js"]
```

The *testSuites* object contains a list of commands (that can be presented in an array). In the current YAML file, commands for executing the tests are put in an array (with a '-' preceding each item). The Maven command *mvn test* is used to run tests located in the current project. In the current project, parallel execution is achieved at the *class* level. The *maven.repo.local* parameter in Maven is used for overriding the location where the dependent Maven packages are downloaded.

```yaml
testSuites:
  - npx cypress run  --spec ./cypress/e2e/2-advanced-examples/$files --browser=$browser --headed --config video=false
```

Cypress is set to true in the YML file.

```yaml
cypress: true
```
Cypress Build name and tags are added in the YML file.

```yaml
cypressOps:
 Build: "Hyperexecute Cypress Sample Build"
 Tags: ["Hyperexecute","Cypress", "Windows", "Matrix"]
 BuildTags: ["Hyperexecute-Cypress"]
```
### Pre Steps

Steps (or commands) that must run before the test execution are listed in the *pre* run step.

```yaml
pre:
  -  npm install
```

### Post Steps

Steps (or commands) that need to run after the test execution are listed in the *post* step. In the example, we *cat* the contents of *yaml/.hyperexecute_matrix.yaml*

```yaml
post:
  - cat yaml/win/.hyperexecute_matrix.yaml
```

## Test Execution

The CLI option *--config* is used for providing the custom HyperExecute YAML file (i.e. *yaml/win/.hyperexecute_matrix.yaml* for Windows and *yaml/linux/.hyperexecute_matrix.yaml* for Linux).

#### Execute cypress_v10 tests using Matrix mechanism on Windows platform

Run the following command on the terminal to trigger the tests in Java files with HyperExecute platform set to Windows. The *--download-artifacts* option is used to inform HyperExecute to download the artifacts for the job. The *--force-clean-artifacts* option force cleans any existing artifacts for the project.

```bash
./hyperexecute --config yaml/win/.hyperexecute_matrix.yaml --force-clean-artifacts --download-artifacts
```

#### Execute cypress_v10 tests using Matrix mechanism on Linux platform

Run the following command on the terminal to trigger the tests in Java files with HyperExecute platform set to Linux. The *--download-artifacts* option is used to inform HyperExecute to download the artifacts for the job. The *--force-clean-artifacts* option force cleans any existing artifacts for the project.

```bash
./hyperexecute --config yaml/linux/.hyperexecute_matrix.yaml --force-clean-artifacts --download-artifacts
```
#### Execute cypress_v10 tests using Matrix mechanism on Mac platform

Run the following command on the terminal to trigger the tests in Java files with HyperExecute platform set to Mac. The *--download-artifacts* option is used to inform HyperExecute to download the artifacts for the job. The *--force-clean-artifacts* option force cleans any existing artifacts for the project.

```bash
./hyperexecute --config yaml/mac/.hyperexecute_matrix.yaml --force-clean-artifacts --download-artifacts
```

Visit [HyperExecute Automation Dashboard](https://automation.lambdatest.com/hyperexecute) to check the status of execution:

<img width="1245" alt="Screenshot 2022-09-12 at 6 51 31 PM" src="https://user-images.githubusercontent.com/89007259/189665359-a5b7d077-ee8a-405a-8f79-619f3308783b.png">

## Secrets Management

In case you want to use any secret keys in the YAML file, the same can be set by clicking on the *Secrets* button the dashboard.

<img width="703" alt="cypress_v10_secrets_key_1" src="https://user-images.githubusercontent.com/1688653/152540968-90e4e8bc-3eb4-4259-856b-5e513cbd19b5.png">

Now create a *secret* key that you can use in the HyperExecute YAML file.

<img width="359" alt="cypress_v10_management_1" src="https://user-images.githubusercontent.com/1688653/153250877-e58445d1-2735-409a-970d-14253991c69e.png">

All you need to do is create an environment variable that uses the secret key:

```yaml
env:
  PAT: ${{ .secrets.testKey }}
```

## Navigation in Automation Dashboard

HyperExecute lets you navigate from/to *Test Logs* in Automation Dashboard from/to *HyperExecute Logs*. You also get relevant get relevant Cypress test details like video, network log, commands, Exceptions & more in the Dashboard. Effortlessly navigate from the automation dashboard to HyperExecute logs (and vice-versa) to get more details of the test execution.

Shown below is the HyperExecute Automation dashboard which also lists the tests that were executed as a part of the test suite:

<img width="1429" alt="cypress_v10_hyperexecute_automation_dashboard" src="https://user-images.githubusercontent.com/1688653/160455415-d145dd30-8521-4e5b-8c80-0fcbd730b506.png">

Here is a screenshot that lists the automation test that was executed on the HyperExecute grid:

<img width="1429" alt="cypress_v10_testing_automation_dashboard" src="https://user-images.githubusercontent.com/1688653/159760375-7f1e3e71-6ea9-449c-8a8d-c4d02c40f7c2.png">

## LambdaTest Community :busts_in_silhouette:

The [LambdaTest Community](https://community.lambdatest.com/) allows people to interact with tech enthusiasts. Connect, ask questions, and learn from tech-savvy people. Discuss best practises in web development, testing, and DevOps with professionals from across the globe.

## Documentation & Resources :books:
      
If you want to learn more about the LambdaTest's features, setup, and usage, visit the [LambdaTest documentation](https://www.lambdatest.com/support/docs/). You can also find in-depth tutorials around test automation, mobile app testing, responsive testing, manual testing on [LambdaTest Blog](https://www.lambdatest.com/blog/) and [LambdaTest Learning Hub](https://www.lambdatest.com/learning-hub/).     
      
 ## About LambdaTest

[LambdaTest](https://www.lambdatest.com) is a leading test execution and orchestration platform that is fast, reliable, scalable, and secure. It allows users to run both manual and automated testing of web and mobile apps across 3000+ different browsers, operating systems, and real device combinations. Using LambdaTest, businesses can ensure quicker developer feedback and hence achieve faster go to market. Over 500 enterprises and 1 Million + users across 130+ countries rely on LambdaTest for their testing needs.

[<img height="70" src="https://user-images.githubusercontent.com/70570645/169649126-ed61f6de-49b5-4593-80cf-3391ca40d665.PNG">](https://accounts.lambdatest.com/register)
      
## We are here to help you :headphones:

* Got a query? we are available 24x7 to help. [Contact Us](mailto:support@lambdatest.com)
* For more info, visit - https://www.lambdatest.com
