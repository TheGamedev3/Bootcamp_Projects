

import { useState } from 'react';

import { Page, Row, Header, Subtitle } from "./SpaceComponents/Card";
export default function Home(){
    const images = [
        'createShip.png',
        'flights.png',
        'planets.png',
        'shipDetails.png',
        'spacecrafts.png'
    ];
    const [selected, setSelected] = useState(null);

    return(
        <Page>
            <Header title={'🏠 Welcome to Space!'} size='3'/>
            <Subtitle color='gray' text={`🔍 click to magnify previews`} size='2' style={{marginBottom:'20px'}}/>
            <Row style={{
                width:'70%',
                gap: '10px', padding:'20px 10px',
                marginBottom:'20px',

                display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
            }}>
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={`/${img}`}
                        alt={img}
                        style={{
                            width: 'auto',
                            height: '200px',
                            objectFit: 'contain',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            boxShadow: '0 0 5px rgba(0,0,0,0.2)'
                        }}
                        onClick={() => setSelected(img)}
                    />
                ))}
            </Row>

            {selected && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999
                }}
                    onClick={() => setSelected(null)}
                >
                    <img src={`/${selected}`} alt={selected}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                        }} />
                </div>
            )}
        </Page>
    );
}
