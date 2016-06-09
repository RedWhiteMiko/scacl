'use strict';

/**
 * @ngdoc function
 * @name scalcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scalcApp
 */
angular.module('scalcApp')
  .controller('MainCtrl', function($scope, QSTREE) {
    $scope.ingestions = QSTREE.ingestions;
    console.log($scope.ingestions);
  })
  .controller('SecondCtrl', function($scope, QSTREE, $routeParams) {
    $scope.ingestion = $routeParams.ingestion;
    $scope.seconds = QSTREE.seconds[$routeParams.ingestion];
  })

.controller('UsageCtrl', function($scope) {
    $scope.data = {
      isStream: false,
      isBatch: false,
      isAPI: false,
      isDatastore: false
    }
  })
  .controller('SpecsCtrl', function($scope, $routeParams, $location, $window) {
    $scope.data = {
      isStream: $routeParams.isStream,
      isBatch: $routeParams.isBatch,
      isAPI: $routeParams.isAPI,
      isDatastore: $routeParams.isDatastore
    };
    $scope.stream = {};

    $scope.saveData = function() {
      console.log($scope.stream);
      $window.utilsave = {
        stream: $scope.stream
      };

      $window.location.href = '/#/recommendation';
    }
  })

.controller('RecCtrl', function($scope, $window, $http) {
  console.log($window.utilsave);

  $scope.stream = $window.utilsave.stream;

  var instance = 5;
  var memory = 2048;
  var cpu = 2;

  var json = {
    "id": "/kafka-datahog",
    "instances": instance,
    "cmd": "sleep 1000",
    "cpus": cpu,
    "disk": 0,
    "mem": memory,
    "user": "root",
    "fetch": [{
      "uri": "https://downloads.mesosphere.com/kafka/assets/jre-8u91-linux-x64.tar.gz"
    }, {
      "uri": "https://downloads.mesosphere.com/kafka/assets/kafka_2.11-0.10.0.0.tgz"
    }, {
      "uri": "https://downloads.mesosphere.com/kafka/assets/1.0.8-0.10.0.0/overrider.zip"
    }],
    "env": {
      "KAFKA_OVERRIDE_ZOOKEEPER_CONNECT": "KAFKA_OVERRIDE_ZOOKEEPER_CONNECT",
      "FRAMEWORK_NAME": "kafka"
    },
    "cmd": "export PATH=$(ls -d $MESOS_SANDBOX/jre*/bin):$PATH && env && $MESOS_SANDBOX/overrider/bin/kafka-config-overrider server $MESOS_SANDBOX/overrider/conf/scheduler.yml && $MESOS_SANDBOX/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh $MESOS_SANDBOX/kafka_2.11-0.10.0.0/config/server.properties"
  }

  $scope.instance = instance;
  $scope.cost = $scope.instance * 10;
  $scope.clustername = 'kafka-datahog';
  $scope.marathonjson = JSON.stringify(json, null, "\t");

  $scope.jsonChange = function() {
    var json = {
      "id": "/" + $scope.clustername,
      "instances": instance,
      "cmd": "sleep 1000",
      "cpus": cpu,
      "disk": 0,
      "mem": memory,
      "user": "root",
      "fetch": [{
        "uri": "https://downloads.mesosphere.com/kafka/assets/jre-8u91-linux-x64.tar.gz"
      }, {
        "uri": "https://downloads.mesosphere.com/kafka/assets/kafka_2.11-0.10.0.0.tgz"
      }, {
        "uri": "https://downloads.mesosphere.com/kafka/assets/1.0.8-0.10.0.0/overrider.zip"
      }],
      "env": {
        "KAFKA_OVERRIDE_ZOOKEEPER_CONNECT": "KAFKA_OVERRIDE_ZOOKEEPER_CONNECT",
        "FRAMEWORK_NAME": "kafka"
      },
      "cmd": "export PATH=$(ls -d $MESOS_SANDBOX/jre*/bin):$PATH && env && $MESOS_SANDBOX/overrider/bin/kafka-config-overrider server $MESOS_SANDBOX/overrider/conf/scheduler.yml && $MESOS_SANDBOX/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh $MESOS_SANDBOX/kafka_2.11-0.10.0.0/config/server.properties"
    }

    $scope.marathonjson = JSON.stringify(json, null, "\t");
    $scope.cost = $scope.instance * 10;
  }

  $scope.deploy = function() {
    var json = {
      "id": "/" + $scope.clustername,
      "instances": instance,
      "cmd": "sleep 1000",
      "cpus": cpu,
      "disk": 0,
      "mem": memory,
      "user": "root",
      "fetch": [{
        "uri": "https://downloads.mesosphere.com/kafka/assets/jre-8u91-linux-x64.tar.gz"
      }, {
        "uri": "https://downloads.mesosphere.com/kafka/assets/kafka_2.11-0.10.0.0.tgz"
      }, {
        "uri": "https://downloads.mesosphere.com/kafka/assets/1.0.8-0.10.0.0/overrider.zip"
      }],
      "env": {
        "KAFKA_OVERRIDE_ZOOKEEPER_CONNECT": "KAFKA_OVERRIDE_ZOOKEEPER_CONNECT",
        "FRAMEWORK_NAME": "kafka"
      },
      "cmd": "export PATH=$(ls -d $MESOS_SANDBOX/jre*/bin):$PATH && env && $MESOS_SANDBOX/overrider/bin/kafka-config-overrider server $MESOS_SANDBOX/overrider/conf/scheduler.yml && $MESOS_SANDBOX/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh $MESOS_SANDBOX/kafka_2.11-0.10.0.0/config/server.properties"
    }

    var parameter = JSON.stringify(json);
    $http.post('http://localhost:8000/service/marathon/v2/apps', parameter).
    success(function(data, status, headers, config) {
      console.log('success');
      console.log(status);
    }).
    error(function(data, status, headers, config) {
      console.log('err');
      console.log(status);
    });
  }
});
