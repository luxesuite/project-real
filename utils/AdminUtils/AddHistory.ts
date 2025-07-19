

export const postHistory = async(formValue:any)=>{


    const res = await fetch("/api/admin/history",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(formValue)
    })
if (!res.ok) {
    console.log("something went wrong");
    
}
    const response = await res.json()

    if (response.success) {
        console.log("added history successfully");
        
    }
    else{
        console.log("could not add history this time");
        
    }


}