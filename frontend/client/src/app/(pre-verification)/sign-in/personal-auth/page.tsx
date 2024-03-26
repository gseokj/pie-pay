'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import ProgressBar from '../_component/ProgressBar';
import * as styles from '@/styles/signin/singin.css';
import TelecomListModal from '../_component/TelecomListModal';

export default function Page() {
  const [info, setInfo] = useState({
    name: '',
    birth: '',
    gender: '',
    genderNum: '',
    telecom: '',
    phone: '',
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone' || name === 'birth') {
      if (/^\d*$/.test(value)) {
        setInfo({ ...info, [name]: value });
      }
    } else if (name === 'genderNum') {
      let newGender = '';
      if (['1', '2', '3', '4', ''].includes(value)) {
        if (value === '1' || value === '3') {
          newGender = 'MALE';
          // setInfo({ ...info, gender: newGender, [name]: value });
        } else if (value === '2' || value === '4') {
          newGender = 'FEMALE';
        }
        setInfo({ ...info, gender: newGender, [name]: value });
      }
    } else if (name === 'name' || name === 'telecom') {
      setInfo({ ...info, [name]: value });
    }
  };

  const setTelecom = (telecomName: string) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      telecom: telecomName,
    }));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <ProgressBar />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>본인인증</div>
        <form className={styles.formContainer}>
          <div className={styles.itemWrapper}>
            <div className={styles.itemName}>이름</div>
            <input
              type="text"
              className={styles.inputBox}
              name="name"
              value={info.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className={styles.itemWrapper}>
            <div className={styles.itemName}>주민등록번호</div>
            <div className={styles.boxWrapper}>
              <input
                className={styles.numInputBox1}
                type="text"
                name="birth"
                maxLength={6}
                value={info.birth}
                onChange={handleChange}
              ></input>
              <div className={styles.numInputBox2Wrapper}>
                <div className={styles.minusBox}></div>
                <input
                  className={styles.numInputBox2}
                  type="text"
                  name="genderNum"
                  maxLength={1}
                  value={info.genderNum}
                  onChange={handleChange}
                ></input>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
          <div className={styles.itemWrapper} onClick={handleShowModal}>
            <div className={styles.itemName}>통신사</div>
            <input
              className={styles.inputBox}
              type="text"
              name="telecom"
              value={info.telecom}
              onChange={handleChange}
              readOnly
            ></input>
          </div>
          <div className={styles.itemWrapper}>
            <div className={styles.itemName}>휴대폰 번호</div>
            <input
              className={styles.inputBox}
              type="number"
              name="phone"
              value={info.phone}
              onChange={handleChange}
            ></input>
          </div>
          <div className={styles.submitButton}>본인인증</div>
        </form>
      </div>
      {showModal && (
        <TelecomListModal onClose={closeModal} onSelect={setTelecom} />
      )}
    </div>
  );
}
