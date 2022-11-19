import './PageContainer.css';

export default function PageContainer(props: React.PropsWithChildren<{}>) {
  return (
    <div className="page-container">
      {props.children}
    </div>
  )
}