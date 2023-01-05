const EventEmiter=require("events")
const event=new EventEmiter();

event.on("sayMyName",()=>{    // event listen and must be defined above emit
    console.log("helloworld");
})

event.on("sayMyName",()=>{    // event listen and must be defined above emit
    console.log("helloworld 1");
})

event.on("sayMyName",()=>{    // event listen and must be defined above emit
    console.log("helloworld 2");
})

event.emit("sayMyName") // user defined event emitted i.e fire once 