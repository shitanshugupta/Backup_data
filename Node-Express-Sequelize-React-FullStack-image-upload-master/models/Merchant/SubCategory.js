module.exports=(sequelize,DataTypes)=>{
    const SubCategory=sequelize.define('SubCategory',{
       
        sub_category_name:{
            type:DataTypes.STRING,
            allownull:false
            
        }
    })
    return SubCategory;
}