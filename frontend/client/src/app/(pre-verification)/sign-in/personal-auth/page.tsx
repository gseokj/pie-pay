import ProgressBar from '../_component/ProgressBar';
import * as styles from '@/styles/signin/singin.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <ProgressBar />
      </div>
      <div>
        <h1>본인인증</h1>
        <form>
          <div>
            이름
            <input type="text"></input>
          </div>
          <div>
            주민등록번호
            <div>
              <input type="text"></input>
              <input type="text"></input>
            </div>
          </div>
          <div>
            통신사
            <input type="text"></input>
          </div>
          <div>
            휴대폰 번호
            <input type="text"></input>
          </div>
          <button type="submit">본인인증</button>
        </form>
      </div>
    </div>
  );
}
