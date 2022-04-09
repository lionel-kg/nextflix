import Input from "../components/Input";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="homePage">
      <div className="homePage_filter">
      </div>
      <div className="container_text">
        <h1 className="title">Films, séries TV et bien plus en illimité.</h1>
        <p className="paragraph_sub">Où que vous soyez. Annulez à tout moment.</p>
        <div>
          <p className="form_title">Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.</p>
          <div className="container_sub">
            <Input classes={"input_sub"} placeholder={"Adresse e-mail"}/> <Button classes={"btn_sub"} text={"Commencer"}/>
          </div>
        </div>
      </div>
    </div>
  )
}
