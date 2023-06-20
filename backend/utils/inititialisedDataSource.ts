import { AppDataSource } from "../data-source";

let initialize:boolean = false

const initializeDataSource = async()=>{
    if(!initialize){
        await AppDataSource.initialize()
        initialize=true
    }
}

export default initializeDataSource