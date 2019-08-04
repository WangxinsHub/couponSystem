import Server from './server';
import Url from './url';

class API extends Server{
  /**
   *  用途：获取验证码
   */
  async couponList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.couponList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async platformList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.platformList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async updateCoupon(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.updateCoupon, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async createCoupon(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.createCoupon, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async sendList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.sendList, params);
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