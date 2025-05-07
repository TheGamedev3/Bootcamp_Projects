
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../SpaceComponents/Card';

export function SmartBackButton(){
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <Card onClick={()=>{
            location.pathname === '/ships'
            ? navigate(-1)
            : navigate('/ships')
        }}>
            <b>Back</b>
        </Card>
    );
}

import OuterSpace2 from '../../API/OuterSpace2';
export function ScrapButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const ship = OuterSpace2.useMyself();

    return(
        <Card onClick={async()=>{
            await ship.destroy();
            location.pathname === '/ships'
            ? navigate(-1)
            : navigate('/ships')
        }}>
            <b>🗑️ Scrap</b>
        </Card>
    );
}
