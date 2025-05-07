
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../SpaceComponents/Card';

export function SmartBackButton(){
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <Button
            text='⬅️ Back'
            onClick={async()=>{
                navigate('/ships')
            }}
        />
    );
}

import OuterSpace2 from '../../API/OuterSpace2';
export function ScrapButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const ship = OuterSpace2.useMyself();

    return(
        <Button
            text='🗑️ Scrap'
            onClick={async()=>{
                await ship.destroy();
                navigate('/ships')
            }}
        />
    );
}
