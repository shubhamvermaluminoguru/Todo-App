const Tasks = require('../Models/task.js');
const redis = require('redis');
const redisClient = redis.createClient({url:process.env.REDIS_URL});
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

const addTask = async ( message) => {
    const newMessage = message.toString(); 
    const newItem ={ name: newMessage, time: new Date() };
    const response = await redisClient.LPUSH('FULLSTACK_TASK', JSON.stringify(newItem)); 
    if(response){ 
        checkRedisCountAndMoveToMongo();
    }else{
        throw new Error("Error adding the item in Redis")
    }
}

const deleteTask = (req, res)=>{

}

const fetchAllTasks=async(req, res)=>{
const tasks = await Tasks.find().sort({time: -1});
    if (!tasks) {
        console.error(err);
        return res.status(404).send('No task found');
    } else {
       let cachedTasks =  await checkRedisCountAndMoveToMongo()
        for(let i = cachedTasks.length-1; i >= 0; i--){
            tasks.unshift({
                "name": JSON.parse(cachedTasks[i]).name,
            })
       }
       return res.status(200).json({success: true, tasks});
    }
}

async function checkRedisCountAndMoveToMongo() {
    const count = await redisClient.LLEN('FULLSTACK_TASK') 
    if (count > 5) {
      let tasks = await redisClient.LRANGE('FULLSTACK_TASK', 0, -1)
      tasks = tasks.map(task => JSON.parse(task));
      const savedTasks = await Tasks.insertMany(tasks);
      await redisClient.DEL('FULLSTACK_TASK'); 
      return []
    }else{
        return await redisClient.LRANGE('FULLSTACK_TASK', 0, -1)
    }
}
         
module.exports = {
    addTask,
    deleteTask,
    fetchAllTasks
}

