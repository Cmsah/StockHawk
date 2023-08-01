const {Transaction} = require('../models');
const {user} = require('../models');

const createTransaction = async(req,res)=>{

    // console.log(req);
    console.log('Create transactions:');
    const t = req.body;
    console.log(req.body);

    if(!req.body) {
        res.status(400).send({message:"content can't be empty"});
        return;
    }

    try {
        console.log(req.user[0].dataValues.uuid);
        const userinfo = await user.findOne({where:{uuid:req.user[0].dataValues.uuid}});
        console.log('userinfo:',userinfo);

        const transact = await Transaction.create(
        {
            userId:userinfo.id,
            uuid:t.uuid,
            AssetClass:t.AssetClass,
            Symbol:t.Symbol,
            PurchaseDate:t.PurchaseDate,
            quantity:t.quantity,
            PurchasePrice:t.PurchasePrice
        });

        return res.redirect('/portfolio');
    } catch (err) {
        console.log('Error in creating the transaction');
        console.log(err);
        return res.status(500).json(err);

    }

}
const getTransactions = async(req,res)=>{
    console.log('Get Transactions');
    console.log(req.user);
    console.log(req.user[0]);
    
    try {
        // if we want all the posts made by the user
        console.log(req.user[0].dataValues.id);
        const transactions = await Transaction.findAll({
                    where:{userId:req.user[0].dataValues.id},
                    include:'user'
                });
        console.log('transactions:',transactions);

        return res.json(transactions);
    } catch (err) {
        console.log('error in getting all the transactions of the user',req.userId);
        return res.status(500).json(err);

    }

}

const deleteTransaction = async(req,res)=>{
      console.log('delelte trancaction controller');
      console.log(req.params.id);
      const id = req.params.id;

    //   console.log('uuid:',uuid);
      try{
        const transaction = await Transaction.findAll({
            where:{id}
        });
        console.log(transaction);
        if(transaction.length === 1)
        await Transaction.destroy({
            where:{id}
        });
        console.log('Transaction deleted successfully');
        return res.redirect('/portfolio');
        // return res.json({message:'user deleted'});
       }catch(err){
        console.log(err); 
        return res.status(500).json({error:'something went wrong in delete transaction controller'});
      }

}
const updateTransaction = async(req,res)=>{

}
module.exports = {createTransaction,getTransactions,deleteTransaction,updateTransaction};