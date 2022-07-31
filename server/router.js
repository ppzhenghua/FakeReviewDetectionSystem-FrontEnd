const express = require('express');
const router = express.Router();
const api = require('./api');
module.exports = router;

router.get('/confirmShop', (req, res, next) => {
  api.confirmShop(req, res, next);
});

router.get('/fetch',(req,res,next)=>{
  api.fetch(req,res,next);
});

router.get('/userSearch', (req, res, next) => {
  api.userSearch(req, res, next);
});

router.post('/userUpdate',(req, res, next) => {
  api.userUpdate(req,res,next);
});

router.post('/userDel', (req, res, next) => {
  api.userDel(req, res, next);
});

router.get('/loginAccount', (req, res, next) => {
  api.loginAccount(req, res, next);
});

router.get('/loginPassword', (req, res, next) => {
  api.loginPassword(req, res, next);
});

router.post('/pwRevise', (req, res, next) => {
  api.pwRevise(req, res, next);
});

router.get('/resultSearch',(req,res,next)=>{
  api.resultSearch(req,res,next);
});

router.get('/criticSearch',(req,res,next)=>{
  api.criticSearch(req,res,next);
});

router.get('/getReal',(req,res,next)=>{
  api.getReal(req,res,next);
});

router.get('/getShop',(req,res,next)=>{
  api.getShop(req,res,next);
});

router.get('/getResultCount',(req,res,next)=>{
  api.getResultCount(req,res,next);
});

router.post('/addResult', (req, res, next) => {
  api.addResult(req, res, next);
});

router.post('/userResultUpdate', (req, res, next) => {
  api.userResultUpdate(req, res, next);
});

router.post('/userAdd',(req,res,next)=>{
  api.userAdd(req,res,next);
});

router.get('/userCount',(req,res,next)=>{
  api.userCount(req,res,next);
});

router.get('/accountSearch',(req,res,next)=>{
  api.accountSearch(req,res,next);
});

router.get('/getCommand',(req,res,next)=>{
  api.getCommand(req,res,next);
});

router.get('/commandSearch',(req,res,next)=>{
  api.commandSearch(req,res,next);
});

router.post('/commandAdd',(req,res,next)=>{
  api.commandAdd(req,res,next);
});

