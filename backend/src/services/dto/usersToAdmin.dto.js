export default class usersToAdminDTO {
    constructor(user){
        this.full_name=`${user.first_name} ${user.last_name}`;
        this.email= user.email;
        this.role= user.role;
        this.role= user.role;
        this.last_connection= user.last_connection;
    }
}
