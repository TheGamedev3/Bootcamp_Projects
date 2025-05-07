


import OuterSpace2 from "../../API/OuterSpace2";
import { Page, ButtonRow } from "../SpaceComponents/Card";
import {SmartBackButton} from "./Buttons";

export default function Build(){
    const ready = OuterSpace2.useReady();
    return(
        <>
            <ButtonRow style={{padding:'5px 10px'}}>
                <SmartBackButton/>
            </ButtonRow>
            <Page>
                {ready
                ? (
                    <>
                        <header style={{
                            fontSize:'3rem',
                        }}>{`🚀 Create a new ship!`}</header>

                    </>
                )
                :(<div>⌛ loading...</div>)}
            </Page>
        </>
    );
}
