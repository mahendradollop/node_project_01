var db = require('../models');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
var student_address = db.student_address;

module.exports.delete_data = (req, res) => {
    var id = req.body.id;
    
    student_address.destroy(
      
        {
            where: { id: id }
        });
    res.status(200).send("1");      
}

module.exports.update_data = (req, res) => {
    var id = req.body.id;
    var postData = {
        address: req.body.address,
        username:req.body.username
    };
    student_address.update(
        postData,
        {
            where: { id: id }
        });
    res.status(200).send("1");      
}

module.exports.insert_data = (req, res) => {
    var postData = {
        address: req.body.address,
        username:req.body.username
    };
    student_address.create(postData);
    res.status(200).send("1");      
}

module.exports.get_all_data_from_single_tbl_direct_val = (req, res) => {
    student_address.max('id',
    {
        where:{
            id:[1,2]
        }
        
    })
    .then(function(sendRes){
       var resData = {"val":sendRes};
       console.log(resData);
        res.status(200).send(resData);
    });
      
}

module.exports.get_all_data_from_single_tbl_order = (req, res) => {
    student_address.findAll({
        
        order: [
            //['id'],
            ['id', 'DESC'],
            //[db.tutorials,'createdAt', 'DESC'],
            //[sequelize.fn('max', sequelize.col('id')),'desc'],
            
        ],
        group: ['id','address'],
        limit: 2,
        offset: 1 
    })
        .then(function (student_address_info) {
            if (student_address_info) {
                res.status(200).send(student_address_info);
            } else {
                res.status(400).send({
                    "message": "No data found"
                })
            }
        });
}

module.exports.get_all_data_from_single_tbl_where = (req, res) => {
    student_address.findAll({
        // 1 oprator check
        // where :{
        //     id:{
        //         [Op.eq]: 2
        //     },
        // }

        // 2 multi cond check
        // where :{
        //     id:2,
        //     address:'a2'
        // }

        // 3 multi cond check with Op
        // WHERE (`student_address`.`id` = 1 OR `student_address`.`id` = 2) AND (`student_address`.`address` = 'a1' OR `student_address`.`address` = 'a2')
        // where: {
        //     id: {
        //       [Op.or]: [1, 2]
        //     },
        //     address: {
        //         [Op.or]: ['a1']
        //       }
        //   }

        // 4 In 
        // where: {
        //     id: {
        //         [Op.in]: [1, 2]
        //     }
        // }

        // 5 
        where: {
            // nexted op
            /* id: {
              [Op.or]: {
                [Op.gt]: 1,
                [Op.eq]: null
              }
            }, */

            // muti cond
            /* [Op.or]: {
                [Op.and]: {

                    address: {
                        [Op.like]: 'a%'
                    },

                    id: {
                        [Op.like]: '%b%'
                    }
                },
                id: [1, 2]
            }, */

            address:'a',
            [Op.not]:[{
                id:[1,2]
            },{
                address:'1'
            }
            
        ]
            

        }
    })
        .then(function (student_address_info) {
            if (student_address_info) {
                res.status(200).send(student_address_info);
            } else {
                res.status(400).send({
                    "message": "No data found"
                })
            }
        });
}

module.exports.get_all_data_from_single_tbl_cnt = (req, res) => {
    student_address.findAll({
        // 1 get selected attr
        //attributes: ['id','address',[sequelize.fn('COUNT', sequelize.col('id')), 'total_rows']],

        // 2  atech extra column and also remove 2 column
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('id')), 'total_rows']
            ],
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(function (student_address_info) {
            if (student_address_info) {
                res.status(200).send(student_address_info);
            } else {
                res.status(400).send({
                    "message": "No data found"
                })
            }
        });
}

module.exports.get_all_data_from_single_tbl = (req, res) => {
    student_address.findAll({
        //attributes: ['id', 'address'],
    })
        .then(function (student_address_info) {
            if (student_address_info) {
                res.status(200).send(student_address_info);
            } else {
                res.status(400).send({
                    "message": "No data found"
                })
            }
        });
}