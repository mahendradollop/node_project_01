module.exports = (sequelize, Sequelize) => {
    const address_tbl = sequelize.define(
        "student_address",
        {
            address: {
                type: Sequelize.STRING(100)
            },
            username:{
                type: Sequelize.STRING(100)
            }
        },{
            freezeTableName: true
        }
    );
    return address_tbl;
}