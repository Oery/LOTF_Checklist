interface Props {
    name: string;
    url: string;
}

function WikiLink({ name, url }: Readonly<Props>) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
        >
            {name}
        </a>
    );
}

export default WikiLink;
