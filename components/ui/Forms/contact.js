
export default function ContactForm(props) {

  return (
    <form className="w-full" role="form" method="post">
        <div className="w-full text-base">
            <div className="w-full flex flex-row justify-between">
                <div className="input-48">
                    <input className="w-full border-0 ring-1 ring-gray-400 focus:ring-gtpurple rounded-lg border border-gray-500 shadow-inner focus:bg-purple-100 focus:bg-opacity-20 h-12 px-3" type="text" name="name" id="name" autoComplete="name" placeholder="Nom complet"/>
                </div>
                <div className="input-48">
                    {/* <PhoneInput defaultCountry='SN' smartCaret={true} countryCallingCodeEditable={false} className='rounded-xl border border-gray-600 shadow-inner w-full focus:bg-red-100 focus:bg-opacity-20  h-12 px-3' placeholder="  Téléphone" value={this.state.telephone} onChange={(e) => this.setState({ telephone: e} )}/> */}
                    <input className="w-full border-0 ring-1 ring-gray-400 focus:ring-gtpurple rounded-lg border border-gray-500 shadow-inner focus:bg-purple-100 focus:bg-opacity-20 h-12 px-3" type="number" name="telephone" id="telephone" autoComplete="telephone" placeholder="Téléphone"/>
                </div>
            </div>

            <div className="w-full mt-4">
                <input className="w-full border-0 ring-1 ring-gray-400 focus:ring-gtpurple rounded-lg border border-gray-500 shadow-inner focus:bg-purple-100 focus:bg-opacity-20 h-12 px-3" type="email" name="email" id="email" autoComplete="email" placeholder="Adresse email"/>
            </div>
            

            <div className="w-full mt-4">
                <textarea className="w-full border-0 ring-1 ring-gray-400 focus:ring-gtpurple rounded-lg border border-gray-500 shadow-inner focus:bg-purple-100 focus:bg-opacity-20 h-36 px-3 py-3" type="text" name="message" id="message" autoComplete="message" rows="5" placeholder="Votre message .." ></textarea>
            </div>

            <div className="mt-4">
                <button type="reset" className="h-9 md:h-11 rounded-lg shadow-md text-sm md:text-base font-medium text-white gt-btn-type1 cursor-pointer px-8 float-right">
                    ENVOYER
                </button>
            </div>
        </div>
    </form>

  );
}
