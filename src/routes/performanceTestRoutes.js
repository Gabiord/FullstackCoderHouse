import { Router} from "express";

const router = Router();


router.get("/operation/simple", (request, response)=>{
    let sum = 0;
    for (let i=0; i<1000000; i+=1){
        sum +=1;
    }
    response.send({sum})
});

router.get("/operation/complex", (request, response)=>{
    let sum =0;
    for (let i=0; i<5e8; i+=1){
        sum+=1;
    }
    response.send({sum})
})


export default router;