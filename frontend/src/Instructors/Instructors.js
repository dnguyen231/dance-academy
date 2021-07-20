import './Instructors.css';
import logo from './img.jpeg'; 
import NavBar from '../Home/NavBar'
import Footer from '../Home/Footer'

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Typography, GridList, Grid, CardContent} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
      },

    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    content: {
        flex: '1 0 auto',
      },
      cover: {
        width: 130,
      },
  });

function Instructors() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5614/instructors')
        .then((res) => res.json())
        .then((data) => {
            setData(data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Data is loading...</p>;
    }
    var count = 1;
    return (
        <div>
        <NavBar />
        <Grid>
            <Grid item> <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '30vh'}}>Meet our instructors!</h2></Grid>
            <GridList cellHeight = {200} cellWidth = {1} spacing={1} padding={20} cols={4}>
                {data.map((item) => (
                    <Card className={classes.root}>
                        <CardContent className={classes.content}>
                            {count++}. 
                            <h4> {item.fname} {item.lname} </h4>
                        </CardContent>
                        <img className = {classes.cover} src ={logo}/>
                    </Card>
            ))}
            </GridList>
        </Grid>
        <Footer />
        </div>
    );
}
export default Instructors;
