/**
 * /*
 * 接口统一集成模块
 *
 * @format
 */

import axios from './axios';

// 默认全部导出
export default {
  getCasePage: (data) => {
    // 查询案件信息
    return axios({
      url: '/case/page',
      method: 'post',
      data
    });
  },
  // 下载案件信息
  downCaseInfo: (params) => {
    return axios({
      url: '/case/download/' + params.id + '?template=' + params.template,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      method: 'get',
      responseType: 'blob'
    });
  },
  // 下载法律条文信息
  downLawInfo: (params) => {
    return axios({
      url: '/law/download/' + params.id + '?template=' + params.template,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      method: 'get',
      responseType: 'blob'
    });
  },
  getCaseDetal: (data) => {
    // 获取案件信息详情
    return axios({
      url: '/case/detail/' + data,
      method: 'post'
    });
  },
  getCaseStatistics: (data) => {
    // 获取案件统计信息
    return axios({
      url: '/case/statistics',
      method: 'post',
      data
    });
  },
  getLawPage: (data) => {
    // 获取法律条文列表
    return axios({
      url: '/law/page',
      method: 'post',
      data
    });
  },
  getLawDetal: (data) => {
    // 查询法律条文详情
    return axios({
      url: '/law/' + data,
      method: 'post'
    });
  },

  downDocFile: (params) => {
    // 下载post
    return axios({
      url: '/judDoc/download',
      method: 'get',
      responseType: 'blob',
      params
    });
  },

  // 文件下载
  downFile: (params) => {
    return axios({
      url: '/fastdfs/download',
      method: 'get',
      responseType: 'blob',
      params
    });
  },
  // 根据id删除文件 /fastdfs/delete
  deleteFile: (data) => {
    return axios({
      url: '/fastdfs/delete/' + data,
      method: 'post'
    });
  },
  // 查询文件服务器IP地址
  getFileIp: (params) => {
    return axios({
      url: '/fastdfs/query',
      method: 'get',
      params
    });
  },
  // 获取短信验证码
  getDxCode: (params) => {
    return axios({
      url: '/clue/sms/code',
      method: 'get',
      params
    });
  },
  // 获取当前的行政区域
  getGzArea: (params) => {
    return axios({
      url: '/area/' + params.code + '/' + params.level,
      method: 'get'
    });
  },
  saveClue: (data) => {
    // 保存线索举报
    return axios({
      url: '/clue/save',
      method: 'post',
      data
    });
  },
  // 典型案例列表查询
  exampleList: (data) => {
    // 保存线索举报
    return axios({
      url: '/typicalCase/page',
      method: 'post',
      data
    });
  },
  // 典型案例列表详情
  exampleDetal: (id) => {
    // 保存线索举报
    return axios({
      url: '/typicalCase/' + id,
      method: 'get'
    });
  },
  // 下载典型案例
  downExample: (id) => {
    return axios({
      url: '/typicalCase/download/' + id,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      method: 'get',
      responseType: 'blob'
    });
  }
};
