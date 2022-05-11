import PageLayout from "components/PageLayout";
import { IUser, IUserAuthResponse } from "interfaces/User";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { PanelData } from "interfaces/Panel";
import { ParsedUrlQuery } from "querystring";
import {decode} from 'jsonwebtoken'
import { IToken } from "interfaces/Token";
import { useRouter } from 'next/router'
import PanelLayout from "components/PanelLayout";



const Panels: NextPage = () => {
    const [panelData, setPanelData] = useState<null | PanelData>(null)
    const [auth, setAuth] = useState(false)
    const [redirect, setRedirect] = useState(false)
    //const [userId, setUserId] = useState(id)
    const router = useRouter()
    useEffect(() => {
        const fetchData = async(token: string) =>{
            const tokenPayload = decode(token) as IToken
            console.log(tokenPayload)
            const apiData = await fetch(`/api/users/${tokenPayload.uid}`, {
                headers:{'Authorization': `Bearer ${token}`}
            })
            console.log(apiData)
            return apiData
        }
      if (localStorage.user) {
          console.log("hay cosas");
          var localStorageData: IUserAuthResponse = JSON.parse(localStorage.user);
          //console.log(localStorageData.token);
          fetchData(localStorageData.token).then((data)=>{
            data.json().then(panelDataResponse=>{
              console.log(panelDataResponse)
              setPanelData(panelDataResponse)
              setAuth(true)
            }).catch(()=>{
                router.push("/login")
            })
          }).catch(()=>{
              router.push("/login")
          })        
      } else {
        console.log("no hay nada");
        router.push("/login")
      }
    }, [router]);
    return (
        <PageLayout >
        {panelData===null ? "Loading" :
          <PanelLayout {...panelData}/>}
        </PageLayout>

    )
}

export default Panels;