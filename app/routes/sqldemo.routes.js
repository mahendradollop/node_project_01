module.exports = app => {
    var router = require("express").Router();
    var sqldemo_ctrl = require('../controllers/sqldemo.controller');

    router.get('/get_all_data_from_single_tbl',sqldemo_ctrl.get_all_data_from_single_tbl)
    router.get('/get_all_data_from_single_tbl_cnt',sqldemo_ctrl.get_all_data_from_single_tbl_cnt)
    router.get('/get_all_data_from_single_tbl_where',sqldemo_ctrl.get_all_data_from_single_tbl_where)
    router.get('/get_all_data_from_single_tbl_order',sqldemo_ctrl.get_all_data_from_single_tbl_order)
    router.get('/get_all_data_from_single_tbl_direct_val',sqldemo_ctrl.get_all_data_from_single_tbl_direct_val)

    router.post('/insert_data',sqldemo_ctrl.insert_data);
    router.post('/update_data',sqldemo_ctrl.update_data);
    router.post('/delete_data',sqldemo_ctrl.delete_data);

    app.use('/api/sqldemo', router);
};