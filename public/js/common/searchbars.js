/* globals $ requester */
$(() => {
    $('#landmarks-search').on('click', () => {
        requester.getJSON('/api/landmarks')
            .then((landmarks) => {
                return landmarks.map((x) => x.title);
            })
            .then((titles) => {
                $('#landmarks-search').autocomplete({
                    source: titles,
                });
            });
    });

    $('#users-search').on('click', () => {
        requester.getJSON('/api/users')
            .then((users) => {
                return users.map((x) => x.username);
            })
            .then((usernames) => {
                $('#users-search').autocomplete({
                    source: usernames,
                });
            });
    });
});
