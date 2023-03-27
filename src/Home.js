import Header from "./Header";
import Workspace from "./WorkSpace";
import { useParams } from "react-router-dom";
export default function Home() {

    const routeParams = useParams();
    console.log(routeParams);
    return (
        <>
            <Header isDirector={routeParams.isDirector}></Header>
            <Workspace></Workspace>
        </>
    )
}