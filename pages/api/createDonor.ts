const {q,client} = require('../../helpers/faunaClient')

const createDonor = async (req:any,res:any) => {
    try{
        const formData = req.body.data;
        const db = await client.query(
            q.Create(
                q.Collection('donors_information'),
                {
                    data:{
                        ...formData
                    }
                }
            )
        )
       res.status(200).json(db.data)

    }  catch (error:any){
        
    res.status(500).json({Error:error.message})
    }
}

export default createDonor;
