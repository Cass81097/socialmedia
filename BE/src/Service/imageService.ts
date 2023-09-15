import {AppDataSource} from "../data-source";
import Image from "../entity/image";


export class ImageService{
    private imageRepository;
    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image)
    }
    add = async (image) => {
        return await this.imageRepository.save(image)
    }
    findAll = async () => {
        return  await this.imageRepository.find({
            relations: {
                status: true
            }
        });

    }
    findAllByStatusId =async (statusId)=>{
        return  await this.imageRepository.find({
            where :{
                status:{id:statusId}
            }
        });

    }
    delete = async (id) => {
        return await this.imageRepository.delete(id)
    }
    update = async (id, image) => {
            return await this.imageRepository.update(id, image);

    }

}
export default new ImageService()