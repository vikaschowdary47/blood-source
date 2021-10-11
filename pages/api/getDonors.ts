const {q,client} = require('../../helpers/faunaClient')

 const getDonors = async (req:any,res:any) => {
   try{
    const db = await client.query(
        q.Map(
          // iterate each item in result
          q.Paginate(
            // make paginatable
            q.Match(
              // query index
              q.Index("all_donors") // specify source
            )
          ),
          (ref:any) => q.Get(ref) // lookup each result by its reference
        )
      );
      
    res.status(200).json(db.data)
   } catch(error:any){
       console.log(error)
    res.status(500).json({Error:error.message})
   }
}


export default getDonors
