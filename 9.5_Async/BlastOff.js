

// Aaron Binay
// 8/30/2024


// Task 1
let oneTimeTasks = [];
let monitoringTaskId = 0;


// Task 2
let accumulativeDelay = 0;
function addOneTimeTask(func, delay){
    oneTimeTasks.push([func, delay+accumulativeDelay]);
    accumulativeDelay += delay;
}


// Task 3
function runOneTimeTasks(){
    oneTimeTasks.forEach(function(item) {
        setTimeout(item[0],item[1])
    });
}


// Task 4
function startMonitoring(){
    monitoringTaskId = setInterval(function(){console.log("BEEP");}, 1000);
}


// Task 5
function stopMonitoring(){clearInterval(monitoringTaskId);}


// Task 6
function startCountdown (duration){
    let intervalId = 0
    function countdown(){
        duration-=1;
        if(duration > -1){
            console.log(duration.toString());
            return;
        }
        duration = 0;
        clearInterval(intervalId);
        console.log("BLAST OFF");
    }
    duration++;
    intervalId = setInterval(countdown, 1000);
    countdown();
}


// Task 7
function scheduleMission(){
    addOneTimeTask(function(){console.log("Loading...");},500);
    addOneTimeTask(startMonitoring,1000);
    addOneTimeTask(stopMonitoring,4000);
    addOneTimeTask(function(){console.log("All systems online!");},500);


    addOneTimeTask(function(){startCountdown(5);},2000);


    runOneTimeTasks();
}


scheduleMission();



