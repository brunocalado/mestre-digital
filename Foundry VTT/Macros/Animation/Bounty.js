const assetPath = 'worlds/scum-and-villainy/images/assets-scifi/datapad-template-wanted-700w.png'
const portraitDemo = 'worlds/scum-and-villainy/images/assets-scifi/faye-valentine-200x200.webp';

create_bounty_journal();

async function create_bounty_journal() {  

  let template = `
<div style="background-image: url(${assetPath}); background-repeat: no-repeat; width: 700px; min-height: 1000px; display: block; padding: 65px 65px; color: #d0faff; font-size: 18px; color: #02e3dd; ">
    <h1 style="width: 100%; text-align: center; margin-bottom: 0.5em; padding-top: 0.25em; padding-bottom: 0.25em; border-bottom: 2px solid #02e3dd; border-top: 2px solid #02e3dd;">Cabeça a Prêmio</h1>
    <div style="float: right; border-left: solid 10px #000000; filter: sepia(100%) saturate(300%) brightness(60%) hue-rotate(130deg);"><img src="${portraitDemo}" alt="" width="200" height="200" /></div>
    <h2 style="margin-bottom: 0.5em; padding-bottom: 0.25em; border-bottom: 2px solid #02e3dd;">Faye Valentine</h2>
    <h3 style=" margin-right: 0.5em; font-weight: bold; font-size: 16px;">Recompensa</h3>
    <p style="font-size: 14px; margin-bottom: 1em;">10,000,000 Creds</p>
    <h3>Procurado</h3>
    <p>Procurada por assalto a guilda.</p>
    <table style="font-size: 14px; border-bottom: 2px solid #02e3dd; border-top: 2px solid #02e3dd;">
        <tbody>
            <tr style="padding-top: 1em;">
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Raça</th>
                <td style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Humana</td>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Altura</th>
                <td style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Desconhecida</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Gênero</th>
                <td style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Feminino</td>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Peso</th>
                <td style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Desconhecido</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Planeta Natal</th>
                <td style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Terra</td>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Idade</th>
                <td style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Desconhecida</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Associados</th>
                <td colspan="3" style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Spike, Jet Black</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Tipo</th>
                <td colspan="3" style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Localizar e prender</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Solicitante</th>
                <td colspan="3" style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Guilda dos Engenheiros</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Recebedor</th>
                <td colspan="3" style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Qualquer força da hegemonia</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Condição</th>
                <td colspan="3" style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Viva. Sem pagamento em caso de morte.</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Bonus</th>
                <td colspan="3" style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Sem.</td>
            </tr>
            <tr>
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Responsabilidades</th>
                <td colspan="3" style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Perdas de vida ou dano a propriedade privada resulta em redução de 50% da recompensa.</td>
            </tr>
            <tr style="padding-bottom: 1em;">
                <th style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Última Localização</th>
                <td colspan="3" style="padding: 0.2em 0; line-height: 1.5em; text-align: left; vertical-align: top;">Portal para o Núcleo</td>
            </tr>
        </tbody>
    </table>
</div>
  `;
  
  let data = {
    "name": 'Bounty',
    "folder": 0,
    "content": template,
  };

  JournalEntry.create(data).then(journal => { journal.sheet.render(true) });
}

