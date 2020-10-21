class UserController {

    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }

    onSubmit() {

        // nao precisa de #, pois esse evento só espera ID
        this.formEl.addEventListener("submit", event => {
            // cancela o evento padrão  
            event.preventDefault();

            let values = this.getValues();

            this.getPhoto().then((content) => {

                values.photo = content;
                this.addLine(values);
            },
                (e) => {
                    console.error(e);
                }
            );

        });

    }

    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            });

            let file = elements[0].files[0];
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e);
            }

            if (file) {
                fileReader.readAsDataURL(file)
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
        });
    }

    getValues() {

        let user = {}; //variável para usar apenas neste escopo
        // é um array e uso spread para não precisar dizer o tamanho.
        [...this.formEl.elements].forEach(function (field, index) {
            // = atribuicao == comparaçao de valor === comparaçao de valor e tipo de dados (string,int).
            if (field.name == "gender") {
                if (field.checked) {
                    user.gender;
                }

            } else if (field.admin == "admin") {
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }

        });
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    }

    addLine(dataUser) {

        let tr = document.createElement('tr');
        tr.innerHTML = `     
        <tr>
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
        <td>${dataUser.birth}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
         </tr>
         `;

        // pega o table-user e add o tr
        // template string - utiliza crase e utiliza $ para tratar variáveis
        this.tableEl.appendChild(tr);

    }
}
