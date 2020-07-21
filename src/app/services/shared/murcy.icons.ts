import {
  faChartLine,
  faCog, faFileAlt,
  faFileSignature,
  faHeart,
  faHistory,
  faPlay,
  faSignOutAlt,
  faUser,
  faUserEdit
} from '@fortawesome/free-solid-svg-icons';
import {LogLevel} from './LogLevel';

export class MurcyIcons {
  public statsIcon = faChartLine;
  public logOutIcon = faSignOutAlt;
  public heartIcon = faHeart;
  public userIcon = faUser;
  public historyIcon = faHistory;
  public playIcon = faPlay;
  public settingsIcon = faCog;
  public newRequestIcon = faFileSignature;
  public editorIcon = faUserEdit;
  public quizRequestIcon = faFileAlt;
  public favIcon = faHeart;

  constructor() {
  }
}
