import Server from './server';
import Url from './url';

class API extends Server{
  /**
   *  用途：获取验证码
   */
  async getList(params = {}){
    console.error(params)
    try{
      let result = await this.axiosCommon('post', Url.list, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   *  用途：登陆
   */
  async login(params = {}){
    try{
      let result = await this.axios('post', Url.login, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async exportTable(params = {}){
    try{
      let result = await this.axiosEasy('get', Url.exportTable, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();