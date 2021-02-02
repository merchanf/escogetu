import styles from './Layout.module.scss';

const Layout = ({children}) => {
  return (
    <div className={styles.Layout}>
      {children}
    </div>
  )
}

export default Layout
