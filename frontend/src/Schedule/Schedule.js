
import Footer from '../Home/Footer'
import NavBar from '../Home/NavBar'
import './Schedule.css';
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop : '10px',
    paddingBottom : '10px',
    paddingLeft:'10px',
    paddingRight:'10px',
  },
  table: {
    borderTopWidth: 1, borderColor: 'black',borderStyle: 'solid'
    
  },
  h2: {
    fontSize: '200pt',
  }
}));

function Schedule() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5614/schedule')
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

    let history = useHistory();

    const redirect = () => {
      history.push('/booking')
    }
    if (loading) {
        return <p>Data is loading...</p>;
    }
    
    return (
    <div>
       <NavBar />
    <Paper className={classes.root}>
      <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>SCHEDULE</h2>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell><h2>Name</h2></TableCell>
                <TableCell><h2>Type</h2></TableCell>
                <TableCell><h2>Level</h2></TableCell>
                <TableCell><h2>Genre</h2></TableCell>
                <TableCell><h2>Individual</h2></TableCell>
                <TableCell><h2>Date & Time</h2></TableCell>
                <TableCell><h2>Duration</h2></TableCell>
                <TableCell><h2>Price</h2></TableCell>
                <TableCell><h2>Availability</h2></TableCell>
                <TableCell><h2></h2></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow>
                  <TableCell><h2>{item.name}</h2></TableCell>
                  <TableCell><a style={{ fontSize: '15px'}}>{item.type}</a></TableCell>
                  <TableCell><a style={{ fontSize: '15px'}}>{item.level}</a></TableCell>
                  <TableCell><a style={{ fontSize: '15px'}}>{item.genre}</a></TableCell>
                  <TableCell><a style={{ fontSize: '15px'}}>{item.individual}</a></TableCell>
                  <TableCell><a style={{ fontSize: '15px'}}>{item.datetime}</a></TableCell>
                  <TableCell><a style={{ fontSize: '15px'}}>{item.duration} hours</a></TableCell>
                  <TableCell><a style={{ fontSize: '15px'}}>${item.price}</a></TableCell>
                  <TableCell><a style={{ fontSize: '15px'}}>{item.availability} spots left</a></TableCell>
                  <TableCell>
                    <Button variant="outlined" color='secondary' onClick={redirect}> 
                      <a style={{ fontSize: '12px'}}>BOOK NOW</a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Footer />
        </div>
    );
}
export default Schedule;
