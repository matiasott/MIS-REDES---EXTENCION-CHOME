document.addEventListener('DOMContentLoaded', function () {
    var socialIcons = [
        { name: 'Facebook', url: 'https://www.facebook.com/', iconClass: 'bi bi-facebook', show: true },
        { name: 'Twitter', url: 'https://www.twitter.com/', iconClass: 'bi bi-twitter', show: true },
        { name: 'Instagram', url: 'https://www.instagram.com/', iconClass: 'bi bi-instagram', show: true },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/', iconClass: 'bi bi-linkedin', show: true },
        { name: 'YouTube', url: 'https://www.youtube.com/', iconClass: 'bi bi-youtube', show: true },
        { name: 'Pinterest', url: 'https://www.pinterest.com/', iconClass: 'bi bi-pinterest', show: true },
        { name: 'Snapchat', url: 'https://www.snapchat.com/', iconClass: 'bi bi-snapchat', show: true },
        { name: 'TikTok', url: 'https://www.tiktok.com/', iconClass: 'bi bi-tiktok', show: true },
        { name: 'Reddit', url: 'https://www.reddit.com/', iconClass: 'bi bi-reddit', show: true },
        { name: 'WhatsApp', url: 'https://web.whatsapp.com/', iconClass: 'bi bi-whatsapp', show: true },
        { name: 'Vimeo', url: 'https://vimeo.com/', iconClass: 'bi bi-vimeo', show: true },
        { name: 'Twitch', url: 'https://www.twitch.tv/', iconClass: 'bi bi-twitch', show: true },
        { name: 'Behance', url: 'https://www.behance.net/', iconClass: 'bi bi-behance', show: true },
        { name: 'Medium', url: 'https://medium.com/', iconClass: 'bi bi-medium', show: true },
        { name: 'Snapchat', url: 'https://www.snapchat.com/', iconClass: 'bi bi-snapchat', show: true },
        { name: 'WeChat', url: 'https://www.wechat.com/', iconClass: 'bi bi-wechat', show: true },
        { name: 'Line', url: 'https://line.me/', iconClass: 'bi bi-line', show: true },
        { name: 'Telegram', url: 'https://telegram.org/', iconClass: 'bi bi-telegram', show: true },
        { name: 'GitHub', url: 'https://github.com/', iconClass: 'bi bi-github', show: true },        
        { name: 'Spotify', url: 'https://www.spotify.com/', iconClass: 'bi bi-spotify', show: true },
        { name: 'Discord', url: 'https://discord.com/', iconClass: 'bi bi-discord', show: true },
    ];

    var socialIconsList = document.getElementById('social-icons');
    var editModeContainer = document.getElementById('edit-mode-container');
    var editModeBtn = document.getElementById('edit-mode-btn');
    var editMode = false;

    var selectedIcons = [];

    function renderIcons(icons) {
        socialIconsList.innerHTML = '';

        icons.forEach(function (socialIcon, index) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            var icon = document.createElement('i');
            var iconText = document.createElement('span');

            link.href = socialIcon.url;
            link.target = '_blank';
            icon.className = socialIcon.iconClass;
            iconText.textContent = socialIcon.name;

            listItem.dataset.index = index;

            if (!socialIcon.show) {
                listItem.classList.add('hidden');
            }

            listItem.addEventListener('click', function (event) {
                if (editMode) {
                    event.preventDefault();
                    listItem.classList.toggle('selected');
                    var iconIndex = parseInt(listItem.dataset.index);
                    if (listItem.classList.contains('selected')) {
                        selectedIcons.push(iconIndex);
                    } else {
                        selectedIcons = selectedIcons.filter(function (index) {
                            return index !== iconIndex;
                        });
                    }
                }
            });

            listItem.addEventListener('mouseover', function () {
                iconText.classList.add('show');
            });

            listItem.addEventListener('mouseout', function () {
                iconText.classList.remove('show');
            });

            link.appendChild(icon);
            listItem.appendChild(link);
            listItem.appendChild(iconText);
            socialIconsList.appendChild(listItem);
        });
    }
    var storedIcons = JSON.parse(localStorage.getItem('socialIcons'));
    var iconsToShow = storedIcons ? socialIcons.filter(function (socialIcon, index) {
        return storedIcons.includes(index);
    }) : socialIcons;
    renderIcons(iconsToShow);

    editModeBtn.addEventListener('click', function () {
        editMode = !editMode;

        if (editMode) {
            selectedIcons = storedIcons ? [...storedIcons] : [];

            document.getElementById('edit-mode-icon').className = 'bi bi-check2';
            socialIconsList.classList.add('edit-mode');
            socialIconsList.classList.add('selectable');
            renderIcons(socialIcons);
            selectedIcons.forEach(function (iconIndex) {
                var listItem = socialIconsList.querySelector(`li[data-index="${iconIndex}"]`);
                if (listItem) {
                    listItem.classList.add('selected');
                }
            });
        } else {
            document.getElementById('edit-mode-icon').className = 'bi bi-pencil-fill';
            socialIconsList.classList.remove('edit-mode');
            socialIconsList.classList.remove('selectable');

            localStorage.setItem('socialIcons', JSON.stringify(selectedIcons));

            var updatedIcons = JSON.parse(localStorage.getItem('socialIcons'));
            var iconsToShow = updatedIcons ? socialIcons.filter(function (socialIcon, index) {
                return updatedIcons.includes(index);
            }) : socialIcons;
            renderIcons(iconsToShow);
        }
    });
});

