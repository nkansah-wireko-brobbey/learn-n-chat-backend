import express from 'express'

import { updateVectoreStore } from '../ai/controllers/resourceController'

export async function resourceHandler(req: express.Request, res: express.Response) {
    console.log('Body: ', req.body)

    try {
        const { url, id } = req.body

        console.log('URL: ', url)
        const response = await updateVectoreStore(url, id)
        console.log('Response: ', response)

        return res.json({ message: response})
    } catch (e: any) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }
}