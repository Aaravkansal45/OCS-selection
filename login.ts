import type { VercelRequest, VercelResponse } from '@vercel/node';
import supabase from '../utils/supabase';

const handler = async (req: VercelRequest, res: VercelResponse) => {
    const { username = 'admin', password = '5f4dcc3b5aa765d61d8327deb882cf99' } = req.query;
    let role;
    let dataUser = [];
    let querySB = supabase
        .from('users')
        .select()
    if (username) {
        querySB = querySB.eq('userid', username)
    }
    if (password) {
        querySB = querySB.eq('password_hash', password)
    }
    const { data, error } = await querySB;
    if (data.length) {
        role = data[0].role;
    }
    if (role === 'admin') {
        const { data, error } = await supabase
            .from('users')
            .select()
        dataUser = data;
    } else {
        dataUser = data;
    }
    return res.json({
        data: dataUser
    })
}
export default handler;
