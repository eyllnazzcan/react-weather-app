import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

export default function Forecast({ forcast }) {

    return (
        <div style={{ marginTop: 20 }}>
            <div className="forecast-main-header">
                5 Day Forecast
            </div>
            <Card.Group itemsPerRow={3}>
                {forcast.map((data,index) => {
                    console.log(index)
                    if(index % 8 == 0)
                        return (
                            <Card className="forecast-card">
                                <Card.Content>
                                    <Card.Header className="forecast-date">
                                        Date: {moment.unix(data.dt).format('LL')}
                                    </Card.Header>
                                    <Card.Header className="forecast-header">
                                        Temprature: {Math.round((data.main.temp_max + data.main.temp_min) / 2)/10} ℃
                                    </Card.Header>
                                    <Card.Meta className="forecast-header">
                                        Humidity: {data.main.humidity} %
                                    </Card.Meta>
                                    <Card.Description className="temp-desc">
                                        Description: {data.weather[0].description}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })}
            </Card.Group>

        </div>
        
    )
}
