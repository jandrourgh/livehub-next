import PageLayout from "components/PageLayout";
import { IUserAuthResponse } from "interfaces/User";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

interface PanelPageProps {

}

const Panel: NextPage = ({}: PanelPageProps) => {
    const [userData, setUserData] = useState(null)
    const [firstLoad, setFirstLoad] = useState(false)
    const router = useRouter()
    const {id} = router.query
    const [userId, setUserId] = useState(id)
    useEffect(() => {
        const fetchData = async(token: string) =>{
            const apiData = await fetch(`/api/users/${userId}`, {
                headers:{'Authorization': `Bearer ${token}`}
            })
            console.log(apiData)
        }
      if (localStorage.user) {
        console.log("hay cosas");
        var localStorageData: IUserAuthResponse = JSON.parse(localStorage.user);
        console.log(localStorageData.token);
        fetchData(localStorageData.token).then(data=>{console.log("DATOS DEL USER", data)})

      } else {
        console.log("no hay nada");
      }
      setFirstLoad(true);
    }, [userId]);
    return (
    <PageLayout>Panel {id}</PageLayout>
    )
}

export default Panel;