export default function formData(raw: any) {
    const formData = new FormData()
    Object.entries(raw).forEach((value) => {
        const key = value[0];
        const val = value[1] ?? null as any;
        val && formData.append(key, val)
    })
    return formData
}