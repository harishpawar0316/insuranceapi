class httpResponse {
    constructor(status, message, data) {
        this.status = status || 200;
        this.message = message;
        this.data = data || [];
        return {
            status:this.status,
            message:this.message,
            data: this.data
          }
      }
      
}
let obj = new httpResponse("",'kkk',"")
console.log(".............obj",obj)

module.exports = {httpResponse}