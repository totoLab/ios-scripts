def extract_info(directory):
    ret = {}
    for filename in os.listdir(directory):
        if filename.endswith(".ips"):
            path = directory + filename
            with open(path, "r") as f:
                content = f.read()
                date = extract_date(filename)
                info = parse_content(content)
                if date not in ret:
                    ret[date] = info
                else:
                    raise RuntimeError("Why are there 2 files with the same date John?")

    return ret
