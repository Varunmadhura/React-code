import React from "react";
import { Link } from "react-router-dom";
import styles from "D:/react-linux-app/django-react-app/src/home.module.css"

export function Home() {
    return (
      <div className={styles.home}>
        <section>
          <h1>Automate Linux with Ease</h1>
          <p>
            Experience seamless Linux management and automation with our
            Django-powered platform. Execute commands, manage systems, and
            streamline your workflows.
          </p>
          <Link to="/register" className="btn btn-warning">Get Started</Link>
        </section>
  
        <section>
          <h2>Why Choose Our Platform?</h2>
          <div className={styles.row}>
            <div className={styles["col-md-4"]}>
              <i className="bi bi-terminal"></i>
              <h4>Execute Commands</h4>
              <p>
                Run complex Linux commands directly from your browser and manage
                servers remotely with ease.
              </p>
            </div>
            <div className={styles["col-md-4"]}>
              <i className="bi bi-speedometer"></i>
              <h4>Schedule Tasks</h4>
              <p>
                Automate repetitive tasks with integrated Celery scheduling for
                continuous server operations.
              </p>
            </div>
            <div className={styles["col-md-4"]}>
              <i className="bi bi-shield-lock"></i>
              <h4>Secure Operations</h4>
              <p>
                All your data and processes are secured with cutting-edge
                encryption and security protocols.
              </p>
            </div>
          </div>
        </section>
  
        <footer>
          <p>&copy; 2024 Linux Automation. All Rights Reserved.</p>
        </footer>
      </div>
    );
  }