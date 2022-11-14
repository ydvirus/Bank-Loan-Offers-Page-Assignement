import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './LoanOffer.css';
import Footer from '../../common/component/Footer';

function LoanOffer() {
  const [expanded, setExpanded] = useState({
    panel1: true,
    panel2: true,
    panel3: true,
  });

  const [cardNo, setCardNo] = useState({
    value: '',
    error: '',
  });
  const [tenure, setTenure] = useState();
  const [loanAmount, setLoanAmount] = useState({
    value: '',
    error: '',
  });

  const [interestRate, setInterestRate] = useState('');

  const [interestAmount, setInterestAmount] = useState(0);
  const [EMI, setEMI] = useState(0);

  const handleTenureRadio = (e) => {
    if (cardNo.value !== '') {
      if (tenure === e.target.value) {
        console.log(
          'Inside handleTenureRadio, inside cardNo not empty, inside tenure is selected'
        );
        setTenure(null);
        setLoanAmount({ value: '', error: '' });
      } else {
        setTenure(e.target.value);
        setLoanAmount({ value: '113000', error: '' });
      }

      if (interestRate === '' || interestRate == null) {
        setInterestRate('5');
      }
    } else {
      setCardNo((prev) => ({
        ...prev,
        error: 'Please select card number first',
      }));
    }
    console.log(e.target.value);
  };

  const handleLoanAmount = (e) => {
    const loanAmount = Number(e.target.value);
    if (cardNo.value !== '') {
      if (loanAmount < 0) {
        // setLoanAmount(prev => ({value: e.target.value, error: "Loan amount can not be less than 1"}))
      } else if (loanAmount > 113000) {
        setLoanAmount((prev) => ({
          value: e.target.value,
          error: 'Loan amount can not be greater than max limit',
        }));
      } else if (isNaN(loanAmount)) {
        // setLoanAmount(prev => ({...prev, error: ""}))
      } else {
        setLoanAmount((prev) => ({ value: e.target.value, error: '' }));
        if (tenure == null || tenure === '') {
          setTenure('6');
        }
        if (interestRate === '' || interestRate == null) {
          setInterestRate('5');
        }
      }
    } else {
      setCardNo((prev) => ({
        ...prev,
        error: 'Please select card number first',
      }));
    }
    console.log('Loan Amount = ', loanAmount);
  };

  const isRadioSelected = (value) => {
    if (cardNo.value === '') {
      return false;
    } else {
      return tenure === value;
    }
  };

  const handleChange = (panel) => (e) => {
    switch (panel) {
      case 'panel1':
        setExpanded((prev) => ({ ...prev, panel1: !prev.panel1 }));
        break;
      case 'panel2':
        setExpanded((prev) => ({ ...prev, panel2: !prev.panel2 }));
        break;
      case 'panel3':
        setExpanded((prev) => ({ ...prev, panel3: !prev.panel3 }));
        break;
      default:
        setExpanded({
          panel1: true,
          panel2: true,
          panel3: true,
        });
    }
  };

  useEffect(() => {
    console.log('Insdie use Effect');
    let tempLoanAmount = Number(loanAmount.value);
    let tempTenure = Number(tenure);
    let tempInterestRate = Number(interestRate);
    // let monthRateOfInterest = tempInterestRate/12/100
    // let oneByRFactor = 1/(1+monthRateOfInterest)**tempTenure
    if (
      tempLoanAmount > 0 &&
      tempLoanAmount <= 113000 &&
      !isNaN(tempLoanAmount) &&
      tenure != null &&
      tenure !== '' &&
      interestRate != null &&
      interestRate !== ''
    ) {
      setInterestAmount(
        tempLoanAmount * (1 + (tempTenure * tempInterestRate) / 100 / 12)
      );
      // setEMI(tempLoanAmount* monthRateOfInterest/ (1 - oneByRFactor))
    } else {
      setInterestAmount(0);
      setEMI(0);
    }
  }, [loanAmount.value, interestRate, tenure]);

  useEffect(() => {
    let tempLoanAmount = Number(loanAmount.value);
    let tempTenure = Number(tenure);
    if (
      tempLoanAmount >= 1 &&
      tempLoanAmount <= 113000 &&
      !isNaN(tempLoanAmount) &&
      tenure != null &&
      tenure !== '' &&
      interestRate != null &&
      interestRate !== ''
    ) {
      setEMI(interestAmount / tempTenure);
    } else {
      setEMI(0);
    }
  }, [interestAmount]);

  useEffect(() => {
    setTenure(null);
    setLoanAmount({ value: '', error: '' });
    setInterestRate('');
  }, [cardNo.value]);

  return (
    <Box
      className="container"
      sx={{
        bgcolor: '#ffffff',
        minHeight: 'calc(100vh - 19.5px)',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        className="content-wrap"
        component="div"
        sx={{ paddingBottom: '58.5px' }}
      >
        <Stack direction="row" sx={{ color: '#0467cc' }}>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            Loan offers on credit card
          </Typography>
        </Stack>
        <Stack>
          <Accordion expanded={expanded.panel1}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                background:
                  'linear-gradient(0deg, rgba(217,232,242,1) 0%, rgba(245,248,251,1) 100%)',
                borderTop: '2px solid #cfe2ef',
                minHeight: '32px',
                height: 'fit-content',
                justifyContent: 'left',
                alignItems: 'center',
                display: 'flex',
                paddingLeft: '16px',
                margin: '0',
              }}
              onClick={handleChange('panel1')}
            >
              <Typography sx={{ color: '#325787', textAlign: 'left' }}>
                Step 1 : Check your loan eligiblity
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '2px' }}>
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <Typography sx={{ fontWeight: '600', textAlign: 'left' }}>
                  Choose a card on which you want to avail loan:
                </Typography>
                <select
                  id="select-card"
                  onChange={(e) => {
                    setCardNo((prev) => ({ value: e.target.value, error: '' }));
                  }}
                >
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  <option value="9821-8327-3210-3590">
                    XXXX-XXXX-XXXX-3590
                  </option>
                  <option value="7930-8716-3921-1920">
                    XXXX-XXXX-XXXX-1920
                  </option>
                  <option value="8798-2819-2992-0075">
                    XXXX-XXXX-XXXX-0075
                  </option>
                </select>
                {cardNo.error && (
                  <Box component="span" sx={{ color: 'red' }}>
                    {cardNo.error}
                  </Box>
                )}
              </Stack>
              <Stack direction={'row'} sx={{ marginTop: '20px' }}>
                <Typography sx={{ fontWeight: '600', textAlign: 'left' }}>
                  Select loan option which suits your requirement:
                </Typography>
              </Stack>
              <Stack
                sx={{
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <table className="loan-options-table">
                  <col />
                  <colgroup span="2"></colgroup>
                  <thead>
                    <tr>
                      <th scope="col">
                        <span>Available tenure in months</span>
                      </th>
                      <th colSpan="2" scope="colgroup">
                        <span>Against your credit limit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>6</td>
                      <td>
                        <input
                          type="radio"
                          className="select-tenure"
                          value="6"
                          name="tenure"
                          onClick={handleTenureRadio}
                          checked={isRadioSelected('6')}
                        />
                      </td>
                      <td>Rs. 113000</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>
                        <input
                          type="radio"
                          className="select-tenure"
                          value="12"
                          name="tenure"
                          onClick={handleTenureRadio}
                          checked={isRadioSelected('12')}
                        />
                      </td>
                      <td>Rs. 113000</td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>
                        <input
                          type="radio"
                          className="select-tenure"
                          value="24"
                          name="tenure"
                          onClick={handleTenureRadio}
                          checked={isRadioSelected('24')}
                        />
                      </td>
                      <td>Rs. 113000</td>
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>
                        <input
                          type="radio"
                          className="select-tenure"
                          value="36"
                          name="tenure"
                          onClick={handleTenureRadio}
                          checked={isRadioSelected('36')}
                        />
                      </td>
                      <td>Rs. 113000</td>
                    </tr>
                    <tr>
                      <td>48</td>
                      <td>
                        <input
                          type="radio"
                          className="select-tenure"
                          value="48"
                          name="tenure"
                          onChange={handleTenureRadio}
                          checked={isRadioSelected('48')}
                        />
                      </td>
                      <td>Rs. 113000</td>
                    </tr>
                  </tbody>
                </table>
              </Stack>

              <Stack direction="row-reverse">
                <Box
                  component="span"
                  sx={{
                    textDecoration: 'underline',
                    color: 'grey',
                    paddingTop: '10px',
                  }}
                >
                  Click here to learn more about credit/cash limit
                </Box>
              </Stack>
              <Stack direction="row">
                <Typography sx={{ textAlign: 'left' }}>
                  The loan options above are only for the card chosen by you.
                  You can avail of loans on your other cards depending on your
                  eligiblity.
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded.panel2}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{
                background:
                  'linear-gradient(0deg, rgba(217,232,242,1) 0%, rgba(245,248,251,1) 100%)',
                borderTop: '2px solid #cfe2ef',
                minHeight: '32px',
                height: 'fit-content',
                justifyContent: 'left',
                alignItems: 'center',
                display: 'flex',
                paddingLeft: '16px',
                margin: '0',
              }}
              onClick={handleChange('panel2')}
            >
              <Typography sx={{ color: '#325787', textAlign: 'left' }}>
                Step 2 : Choose your loan amount
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="left"
              >
                <Grid item xs={12}>
                  <Stack direction={'row'}>
                    <Typography>Loan tenure:</Typography>
                    <img
                      className="question-mark-image"
                      src={'https://freesvg.org/img/1457633527.png'}
                      alt="Question Mark-icon - Help Question Mark Icon @clipartmax.com"
                    />
                    {tenure ? (
                      <Box
                        component="label"
                        sx={{ marginLeft: '8px', fontWeight: '500' }}
                      >
                        {tenure}
                      </Box>
                    ) : null}
                  </Stack>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  sx={{ paddingLeft: '16px', paddingTop: '16px' }}
                >
                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        justifyContent: 'flex-start',
                        display: 'flex',
                        textAlign: 'left',
                      }}
                    >
                      Specify the exact loan amount you wish to avail of:
                    </Typography>
                    <Typography
                      sx={{ justifyContent: 'flex-start', display: 'flex' }}
                    >
                      (in Rupees)
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    sx={{ textAlign: 'left', paddingLeft: '10px' }}
                  >
                    <input
                      type="text"
                      value={loanAmount.value}
                      onChange={handleLoanAmount}
                      className="loan-input"
                    />
                    {loanAmount.error && (
                      <Box component="span" sx={{ color: 'red' }}>
                        {loanAmount.error}
                      </Box>
                    )}
                    <br />
                    <Box component="span">
                      (The amount displayed above is the maximum loan amount you
                      are eligible for. You can edit the Loan Amount to a lesser
                      value to suit your requirement)
                    </Box>
                  </Grid>
                </Grid>

                <Grid item>
                  <ul className="step2-list-items">
                    <li>
                      For the above loan amount:{' '}
                      {loanAmount.value > 0 && loanAmount.value <= 113000 ? (
                        <Box
                          component="label"
                          sx={{ paddingLeft: '8px', fontWeight: '500' }}
                        >
                          {Number(loanAmount.value)}
                        </Box>
                      ) : null}
                    </li>
                    <li>
                      Your initial Interest Amount will be:{' '}
                      <img
                        className="question-mark-image"
                        src={'https://freesvg.org/img/1457633527.png'}
                        alt="Question Mark-icon - Help Question Mark Icon @clipartmax.com"
                      />{' '}
                      <Box
                        component="span"
                        sx={{ color: 'red', fontWeight: '500' }}
                      >
                        Rs. {interestAmount ? interestAmount.toFixed(2) : null}
                      </Box>
                    </li>
                    <li>
                      Your EMI (Equated Monthly Installments) will be{' '}
                      <img
                        className="question-mark-image"
                        src={'https://freesvg.org/img/1457633527.png'}
                        alt="Question Mark-icon - Help Question Mark Icon @clipartmax.com"
                      />{' '}
                      <Box
                        component="span"
                        sx={{ color: 'red', fontWeight: '500' }}
                      >
                        Rs. {EMI ? EMI.toFixed(2) : null}
                      </Box>
                    </li>
                    <li>
                      At an annual reducing balance interest rate of{' '}
                      <Box component="label" sx={{ fontWeight: '500' }}>
                        {interestRate}
                      </Box>{' '}
                      %
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded.panel3}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel3a-header"
              sx={{
                background:
                  'linear-gradient(0deg, rgba(217,232,242,1) 0%, rgba(245,248,251,1) 100%)',
                borderTop: '2px solid #cfe2ef',
                minHeight: '32px',
                height: 'fit-content',
                justifyContent: 'left',
                alignItems: 'center',
                display: 'flex',
                paddingLeft: '16px',
                margin: '0',
              }}
              onClick={handleChange('panel3')}
            >
              <Typography sx={{ color: '#325787', textAlign: 'left' }}>
                Step 3 : Please provide the details to get your funds instantly
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                className="booking-details"
                sx={{ marginTop: '16px', width: '50%' }}
              >
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th colSpan="2">Booking details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Citibank account to credit the loan amount:</td>
                      <td>
                        <select>
                          <option hidden disabled selected value>
                            Select amount
                          </option>
                          <option>50,000</option>
                          <option>1,00,000</option>
                          <option>5,00,000</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Purpose of loan</td>
                      <td>
                        <select>
                          <option hidden disabled selected value>
                            Select purpose
                          </option>
                          <option>Business loan</option>
                          <option>Personal loan</option>
                          <option>Home loan</option>
                          <option>Car loan</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Box
                className="personal-details"
                sx={{ marginTop: '16px', width: '50%' }}
              >
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th colSpan="2">Personal details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Employment:</td>
                      <td>
                        <select>
                          <option hidden disabled selected value>
                            Select employment
                          </option>
                          <option>50,000</option>
                          <option>1,00,000</option>
                          <option>5,00,000</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Profession:</td>
                      <td>
                        <select>
                          <option hidden disabled selected value>
                            Select profession
                          </option>
                          <option>Business loan</option>
                          <option>Personal loan</option>
                          <option>Home loan</option>
                          <option>Car loan</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Education:</td>
                      <td>
                        <select>
                          <option hidden disabled selected value>
                            Select education
                          </option>
                          <option>Business loan</option>
                          <option>Personal loan</option>
                          <option>Home loan</option>
                          <option>Car loan</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
      <Box
        className="footer"
        component="footer"
        sx={{
          position: 'absolute',
          bottom: '0',
          height: '58.5px',
          width: '100%',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default LoanOffer;
