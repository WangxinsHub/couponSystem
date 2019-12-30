import Server from './server';
import Url from './url';

class API extends Server{
  /**
   *  用途：获取验证码
   */
  async codeList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.codeList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async codeImport(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.codeImport, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async menuList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.menuList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }


  async getCode(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.getCode, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async couponStore(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.couponStore, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async stock(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.stock, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async deleteCode(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.deleteCode, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

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
      let result = await this.axios('post', Url.updateCoupon, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }
  async sendCode(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.sendCode, params);
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

  async createPlantForm(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.createPlantForm, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async updatePlantForm(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.updatePlantForm, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async activeList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.activeList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async delCoupon(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.delCoupon, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }


  async departmentList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.departmentList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async batchList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.batchList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }



  async sendCode(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.sendCode, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async createActive(params = {}){
    try{
      let result = await this.axios('post', Url.createActive, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async updateActive(params = {}){
    try{
      let result = await this.axios('post', Url.updateActive, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async updateDepartment(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.updateDepartment, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }
  async updateUser(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.updateUser, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }
  async deleteUser(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.deleteUser, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async getCoupon(params = {}){
    try{
      let result = await this.axios('post', Url.getCoupon, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async createDepartment(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.createDepartment, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async userList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.userList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async getUserMenu(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.getUserMenu, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }


  async roleList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.roleList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }


  async mList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.mList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }


  async addMeet(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.addMeet, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async mUpdate(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.mUpdate, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async blList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.blList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }
  async blDelete(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.blDelete, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async cargoList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.cargoList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async goodsCreate(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.goodsCreate, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async goodsList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.goodsList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }


  async typeList(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.typeList, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async updateGoods(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.updateGoods, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }



  async bindMenu(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.bindMenu, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async connectRole(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.connectRole, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async createRole(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.createRole, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async updateRole(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.updateRole, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async createPermission(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.createPermission, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async roleMenu(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.roleMenu, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async activityCoupon(params = {}){
    try{
      let result = await this.axios('post', Url.activityCoupon, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async reSend(params = {}){
    try{
      let result = await this.axios('post', Url.reSend, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async deleteActive(params = {}){
    try{
      let result = await this.axiosCommon('post', Url.deleteActive, params);
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

  async verifyCode(params = {}){
    try{
      let result = await this.axios('post', Url.verifyCode, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }


  async exportTable(params = {}){
    try{
      let result = await this.axios('get', Url.exportTable, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }

  async giftLogin(params = {}){
    try{
      let result = await this.axios('post', Url.giftLogin, params);
      if(result) {
        return result;
      }
    }catch(err){
      throw err;
    }
  }


  async giftVerify(params = {}){
    try{
      let result = await this.axios('post', Url.giftVerify, params);
      return result;

    }catch(err){
      throw err;
    }
  }

  async giftApply(params = {}){
    try{
      let result = await this.axios('post', Url.giftApply, params);
      return result;

    }catch(err){
      throw err;
    }
  }


  async giftHistory(params = {}){
    try{
      let result = await this.axios('post', Url.giftHistory, params);
      return result;

    }catch(err){
      throw err;
    }
  }




}

export default new API();