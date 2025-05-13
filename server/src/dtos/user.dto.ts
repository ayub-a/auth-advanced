
interface IUserModel {
    [key:string]: any
}


class UserDTO {

    id: string
    email: string
    isActivated: boolean

    constructor(model: IUserModel) {
        this.id = model._id,
        this.email = model.email,
        this.isActivated = model.isActivated
    }
    
}

export default UserDTO
